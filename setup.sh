npm pkg delete dependencies.node-dht-sensor || true && \
    npm pkg delete devDependencies.node-dht-sensor || true
npm ci
npm install node-dht-sensor --use_libgpiod=true


