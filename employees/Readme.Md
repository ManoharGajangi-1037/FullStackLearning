npm init -y

npm install express

npm i -D typescript ts-node-dev @types/node @types/express

npx tsc --init

Updating tsconfig file

{
"compilerOptions": {
"target": "ES2020",
"module": "CommonJS",
"moduleResolution": "node",
"rootDir": "./src",
"outDir": "./dist",
"esModuleInterop": true,
"strict": true,
"skipLibCheck": true
}
}

In Package.json we have to add
"dev":"ts-node-dev --respawn src/index.ts"
under scripts section
