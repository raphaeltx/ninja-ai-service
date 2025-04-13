#!/bin/bash

set -euo pipefail

# Constants
CLUSTER_NAME="local-cluster"
NAMESPACE="mcp-ai-service-dev"
IMAGE_NAME="mcp-ai-service:0.0.1"
SERVICE_NAME="mcp-ai-service"
VALUES_DIR="helm/values-dev.yaml"
DEPLOYMENT_NAME=""

# Function to create a Kind cluster if it doesn't exist
create_kind_cluster() {
  echo_header "Creating Kind cluster: $CLUSTER_NAME"
  if ! kind get clusters | grep -q "$CLUSTER_NAME"; then
    kind create cluster --name "$CLUSTER_NAME"
    echo_footer "Kind cluster $CLUSTER_NAME created."
  else
    echo_footer "Kind cluster $CLUSTER_NAME already exists."
  fi
}

# Function to build the Docker image
build_docker_image() {
  echo_header "Building Docker image: $IMAGE_NAME"
  docker build -t "$IMAGE_NAME" .
  echo_footer "Docker image $IMAGE_NAME built."
}

# Function to load the Docker image into the Kind cluster
load_docker_image() {
  echo_header "Loading Docker image into Kind cluster"
  kind load docker-image "$IMAGE_NAME" --name "$CLUSTER_NAME"
  echo_footer "Docker image $IMAGE_NAME loaded into Kind cluster."
}

# Function to create the Kubernetes namespace
create_namespace() {
  echo_header "Creating namespace: $NAMESPACE"
  if ! kubectl get namespace "$NAMESPACE" &>/dev/null; then
    kubectl create namespace "$NAMESPACE"
    echo_footer "Namespace $NAMESPACE created."
  else
    echo_footer "Namespace $NAMESPACE already exists."
  fi
}

# Function to validate the deployment name in the values file
validate_deployment_name() {
  echo "Validating deployment name..."

  VALUES_FILE="helm/values-dev.yaml"
  if [ ! -f "$VALUES_FILE" ]; then
    echo_error "File $VALUES_FILE not found"
    exit 1
  fi

  DEPLOYMENT_NAME="$(yq r helm/values-dev.yaml 'deploymentName')"
  if [ -z "$DEPLOYMENT_NAME" ]; then
    echo_error "Deployment name not found in helm/values-dev.yaml"
    exit 1
  fi

  echo "Deployment name: $DEPLOYMENT_NAME"
}

# Function to apply Kubernetes manifests
apply_k8s_manifests() {
  echo_header "Applying Kubernetes manifests"
  validate_deployment_name
  helm upgrade --install "$DEPLOYMENT_NAME" helm -f "$VALUES_DIR" --namespace "$NAMESPACE" \
    --set aws.accessKeyId="$AWS_ACCESS_KEY_ID" \
    --set aws.secretAccessKey="$AWS_SECRET_ACCESS_KEY" \
    --set aws.sessionToken="$AWS_SESSION_TOKEN"
  echo_footer "Kubernetes manifests applied."
}

# Function to wait for the deployment rollout
wait_for_rollout() {
  echo_header "Waiting for deployment rollout"
  kubectl rollout status deployment/"$DEPLOYMENT_NAME" -n "$NAMESPACE"
  echo_footer "Deployment rollout complete."
}

# Function to get the service URL
get_service_url() {
  echo_header "Fetching service URL"
  NODE_PORT=$(kubectl get service "$SERVICE_NAME" -n "$NAMESPACE" -o=jsonpath='{.spec.ports[0].nodePort}')
  echo_footer "Service is available at: http://localhost:$NODE_PORT"
}

# Main script execution
main() {
  echo_app_title "mcp_ai_service"
  create_kind_cluster
  build_docker_image
  load_docker_image
  create_namespace
  apply_k8s_manifests
  wait_for_rollout
  get_service_url
}

main "$@"
