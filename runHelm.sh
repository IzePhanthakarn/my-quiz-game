#!/bin/sh

export NAMESPACE=frontend
export PROJECT_NAME=med-frontend


set -x

# Check if ENV variable is set
if [ -z "$ENV" ]; then
    echo "ENV variable is not set. Please set it to 'UAT' or 'DEV'."
    exit 1
fi

# Set var1 based on the value of ENV
if [ "$ENV" = "UAT" ]; then
    FILE_DEFAULT="default.yaml"
    FILE_ENV="uat.yaml"
    HELM_REPO_NAME="oci://ry-c4tkg-uat-tkc01-harbor.ssomgmt.go.th/wcf2/wcf2-deployment"
elif [ "$ENV" = "DEV" ]; then
    FILE_DEFAULT="default-dev.yaml"
    FILE_ENV="dev.yaml"
    HELM_REPO_NAME="oci://devopstools-harbor.lab/wcf2/wcf2-deployment"
else
    echo "Invalid ENV value. Please use 'UAT' or 'DEV'."
    exit 1
fi



helm upgrade -i -n ${NAMESPACE} -f ./deployment/$FILE_DEFAULT -f ./deployment/$FILE_ENV \
  ${PROJECT_NAME} \
  $HELM_REPO_NAME \
  --insecure-skip-tls-verify
