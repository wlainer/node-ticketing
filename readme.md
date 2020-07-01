# Create secret for signing JWT

k create secret generic jwt-secret --from-literal=JWT_KEY=asdf

# Command to run a container inside cluster

kubectl run --generator=run-pod/v1 -it alpine --image=alpine -- /bin/sh

# Expose ingress NodePort

kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system
