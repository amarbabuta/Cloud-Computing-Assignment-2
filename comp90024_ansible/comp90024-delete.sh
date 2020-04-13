#!/usr/bin/env bash
. ./openrc.sh; ansible-playbook --ask-become-pass comp90024.yml -i ./inventory --skip-tags "present" --forks 1