#!/bin/bash

# Script to delete all feature branches both locally and on GitHub

echo "Deleting local feature branches..."
git branch | grep "feature/" | xargs git branch -d

echo "Deleting remote feature branches on GitHub..."
git branch -r | grep "origin/feature/" | sed 's/origin\///' | xargs -I {} git push origin --delete {}

echo "All feature branches have been deleted."