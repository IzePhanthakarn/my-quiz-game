#!/bin/sh

export NAMESPACE=frontend
export PROJECT_NAME=med-frontend


set -x

helm upgrade -i -n ${NAMESPACE} -f ./deployment/default.yaml -f ./deployment/uat.yaml \
  ${PROJECT_NAME} oci://ry-c4tkg-uat-tkc01-harbor.ssomgmt.go.th/wcf2/wcf2-deployment \
  --insecure-skip-tls-verify
