# Setting up Nestjs

**Creating a repository on github**

First of all I wanted to create a github repository to store my project and maintain a history of what I am doing. I currently have two github of my own. One is for my work or office and the other is for my personal projects. I had already setup an SSH for my work github but I wanted to setup another SSH for my personal github. Lets see how I can do this.  
In the beginning I went to my terminal and generated new SSH key:

```shell

ssh-keygen -t ed25519 -C "your_email@example.com"
```

When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location. Please note that if you created SSH keys previously, ssh-keygen may ask you to rewrite another key, in which case we recommend creating a custom-named SSH key. To do so, type the default file location and replace id_ALGORITHM with your custom key name.

```shell

Enter a file in which to save the key (/Users/YOU/.ssh/id_ALGORITHM): /Users/YOU/.ssh/id_ed25519_certain_name

```

After this I was asked to enter a passphrase, but I didn’t want any so I clicked enter(no passphrase).

I then have to access my public key for which I used following command:

```shell
cat /Users/pratham/.ssh/id_ed25519_certain_name.pub
```

Then I saved the public key in my github by going through _Github \> Settings \> SSH and GPG keys._ Once I saved my new SSH keys. I created an empty github repository and tried to clone it using the SSH url provided in my empty repository. If you only have one SSH key saved in your device you may not face any problem if everything is correct. But as I has two ssh key saved in my device , my terminal was always accessing the first one or the one that I was using for my work. It was frustrating at first. Then what I did was I created a config file within the **.ssh** folder.

```shell
nano ~/.ssh/config
```

Once my config file was created , I added following configuration to the ssh

```shell
# Work account (Default)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed255xx

# Personal account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed255xx_certain_name

```

Now when I cloned my project I used

```shell
git clone git@github.com-personal:happywhendrunk/nestjs-setup.git

```

After this cloning was successful.

**What is Nestjs and why do we use it ?**

Nestjs is a framework for creating server-side applications. It is built above Express js. _Express was unopinionated, providing developers with freedom to implement their code. There was no particular architecture or structure followed by Express. Express lacks set of rules, allowing multiple possibilities of structure._

On the other hand Nestjs is opinionated , follows [SOLID](https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/) principles and has a proper architecture. It follows MVC(Model View Controller) architecture. Nestjs fully embraces typescript which helps in proper error handling and catching errors during development which is a great advantage while building big applications. Also _Typescript’s Decorators_ in Nestjs enables meta programming. The core idea of meta programming is to write code that writes or manipulates code, which helps automate repetitive tasks, reduce boilerplate, and add dynamic behavior to software. Nestjs has built in validation and pipes. Pipes automatically validate and transform the input data before it goes to where it needs to go.

**Installation**  
Nestjs has its own CLI which makes it easier. Nest CLI is a command line interface tool that makes installation, development and maintenance of Nestjs application easier. Lets install the Nestjs CLI globally(_\-g_) :

```shell

npm install -g @nestjs/cli
```

Now lets create our new project using Nest .

```shell

nest new project-name
```

This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project.

**Dockerizing the application**

Now let's dockerize the application. Why do we need to dockerize the application ? Docker is a tool that can package software in containers that runs reliably in any container. Docker container is a kind of virtual machine but instead of virtualizing hardware it virtualizes OS. This makes apps or softwares run in a single kernel that makes applications faster. In the universe of docker you need to know three things. The _Dockerfile, image and containers._ The Dockerfile is an extensionless file which contains code on how to build an image. Image is a snapshot of the software and all its dependencies. The image is immutable and can be used to spin up multiple containers which is our actual software running in the real world.

Dockerfile

```shell
FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]

EXPOSE 3002

```

**FROM:** use an existing template or image which is generally fetched from the dockerhub. Node:22-alpine is a lightweight image that consists node js preinstalled.  
**WORKDIR :** sets /app as the working directory.  
**COPY:** copies our source code into the image.  
**RUN:** Runs the given command  
**CMD:** What command to run  
**EXPOSE:** This tells the developer where to look for the running application. This tells the application is listening on PORT 3002 not what port host is connecting to docker. It acts as "documentation" for anyone running the image.

Now I can build by image by following command:

```shell
docker build -t nestjs-starter-kit .
```

The docker build command uses the Dockerfile to create a new image. The \-t flag is the tag used for the image or you can even say the name of the image. ‘.’ says it should look for Dockerfile in the current directory.

After the build gets successful you can create a container of your image. For that you should run following command:

```shell
docker run -d -p 127.0.0.1:3000:3000 nestjs-starter-kit
```

- The \-d (short for –detach) flag tells docker to run in detach or background mode. This makes your terminal free of use for other work while docker runs your container in the background.
- The \-p (short for –publish) tells docker on which port the host should talk with the container. It creates port mapping between host and container in the format of HOST:CONTAINER. The HOST is the port of the host and CONTAINER is the port of the container. It tells on which port of the container should the host talk to.

Once it runs you can access your application on localhost:3002 as 3002 is the port where our application is listening.

Now you may be curious how I can get inside my container that I just created. I was curious on knowing what does the WORKDIR /app actually do. I ran following command

```shell
docker exec -it <container-id> /bin/sh
```

- Docker exec tells container I want to run a command inside my container
- \-it is short for –interactive and –tty which gives me a interactive terminal by opening a session which I can use like a normal terminal
- /bin/sh is the shell I want to use which is the default for alpine linux.

**Connecting to a database**  
Since I have set up a starter kit for my application. I want to connect to a database. I am using postgresql. Ok to be honest I had never installed postgresql in my mac before. Since I had the mac I had been using supabase so there wasn’t any need to install the postgresql. Postgresql is a relational database. I will be using typeorm . TypeORM is the most matured ORM’s as it has been created using typescripts and it integrates well with Nestjs.

At first we need a driver that acts as a bridge between typeorm and postgres. Let's install that .

```shell
npm install pg
```

Lets install TypeORM for Nestjs

```ts

npm install --save @nestjs/typeorm typeorm
```

I have created a config folder inside src where I will add various configuration files. For the database I have created a folder **db** where I will add various configuration files related to the database.  
Here is my file [db.ts](http://db.ts) which contains following configuration:

```ts
export const connectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: false,
} as const;

export default {
  ...connectionOptions,
  //if we don't use autoLoadEntities then we have to add each entity in the entities array.
  //   entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
  // autoLoadEntities load all the entities on startup so that its not necessary to add each entity
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
```

As you can see here we have two exports. Why do we need the two exports when we could have written the configuration within the same object. The object connectionOptions is used in files like [app-datasource.ts](http://app-datasource.ts) . I will talk about [app-datasource.ts](http://app-datasource.ts) later on.

In this file everything within the connectionOptions object is normal configuration to connect with the database. Why do I have a \`as const\` used if I am already declaring it as \`const\` ? It is because it treats the object as immutable or readonly and the value of type is "postgres" , not string . If we don't add the const the type of \`type\` is string but it's value can be anything and we don't want that. This configuration is used in \`[app.module.ts](http://app.module.ts)\` where we import the \`TypeOrmModule\` inside the \`AppModule\`.

```ts
import dataBaseConfig from '@/config/database/db';

TypeOrmModule.forRoot({
      ...dataBaseConfig,
 }),
```

So when the app starts the database will be connected from here using the configurations we provided.

Oh\! I forgot . In Nestjs environment variables aren’t read by default. We must use the \`@nestjs/config\` package. In Node.js applications, it's common to use \`.env\` files, holding key-value pairs where each key represents a particular value, to represent each environment. Running an app in different environments is then just a matter of swapping in the correct \`.env\` file.

A good approach for using this technique in Nest is to create a \`ConfigModule\` that exposes a \`ConfigService\` which loads the appropriate \`.env\` file. While you may choose to write such a module yourself, for convenience Nest provides the \`@nestjs/config\` package out-of-the box.

```ts

npm i --save @nestjs/config

```

This package internally uses \`dotenv\`.

To use this dependency we have to import the module inside \`AppModule\` like we did for TypeOrm.

```ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
```

Now if we run the application everything will work. If incase it throws error we have to explicitly import \`dotenv\` package by downloading it by following command.

```ts
npm install dotenv
```

I have created a separate \`[env.ts](http://env.ts)\` file to store access to my environment variables . This will be useful later on for validation of environment variables.

```ts
import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};
```

**Why have I created another file called \`[app-datasource.ts](http://app-datasource.ts)\`?**  
The \`connectionOptions\` object tells the technique required by Nestjs application required to connect to the database. It is read by the Nestjs application when the application starts. But the server doesn't completely start or never starts during the migration or test cases. For that we create a new \`DataSource\` object which is a standalone object which is not dependent on the Nestjs application. If you see on the \`app-datasource.ts\` file you will see that \`connectionOptions\` is imported there and used to create a new \`DataSource\` object. This is because the \`DataSource\` object is used to create the database tables and run migrations.

```ts
import { DataSource } from 'typeorm';
import { connectionOptions } from './db';

const appDataSource = new DataSource({
  ...connectionOptions,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
});

export default appDataSource;
```

**TypeOrmModuleOptions VS DataSourceOption**  
\`TypeOrmModuleOption\` is a package provided by Nestjs which tells us how my database connects to my database. It tells NestJS how to manage the TypeORM connection within its module system. \`TypeOrmModuleOption\` extends \`DataSourceOption\` . \`DataSourceOption\` comes directly from the TypeORM package itself. \`DataSourceOption\` defines the fundamental technical properties required to connect to a database.
