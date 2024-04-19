 docker run --restart=always --name issabel \
        --privileged -v /sys/fs/cgroup:/sys/fs/cgroup:ro \
        -v issabel-etc:/etc -v issabel-data:/var/lib \
        -dti --hostname pbx.cubicerp.com --network host \
        igmtecnologia/servidores:telefonia_janeiro