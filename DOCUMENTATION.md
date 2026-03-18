# Setting up Nestjs

**Creating a repository on github**

First of all I wanted to create a github repository to store my project and maintain a history of what I am doing. I currently have two github of my own. One is for my work or office and the other is for my personal projects. I had already setup an SSH for my work github but I wanted to setup another SSH for my personal github. Lets see how I can do this.  
In the beginning I went to my terminal and generated new SSH key: 

```shell

ssh-keygen -t ed25519 -C "your_email@example.com"
```

When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location. Please note that if you created SSH keys previously, ssh-keygen may ask you to rewrite another key, in which case we recommend creating a custom-named SSH key. To do so, type the default file location and replace id\_ALGORITHM with your custom key name.

```shell

Enter a file in which to save the key (/Users/YOU/.ssh/id_ALGORITHM): /Users/YOU/.ssh/id_ed25519_certain_name

```

After this I was asked to enter a passphrase, but I didn’t want any so I clicked enter(no passphrase).

I then have to access my public key for which I used following command:

```shell
cat /Users/pratham/.ssh/id_ed25519_certain_name.pub
```

Then I saved the public key in my github by going through *Github \> Settings \> SSH and GPG keys.* Once I saved my new SSH keys. I created an empty github repository and tried to clone it using the SSH url provided in my empty repository. If you only have one SSH key saved in your device you may not face any problem if everything is correct. But as I has two ssh key saved in my device , my terminal was always accessing the first one or the one that I was using for my work. It was frustrating at first. Then what I did was I created a config file within the **.ssh** folder.

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

Nestjs is a framework for creating server-side applications. It is built above Express js. *Express was unopinionated, providing  developers with freedom to implement their code. There was no particular architecture or structure followed by Express. Express lacks set of rules, allowing multiple possibilities of structure.*

On the other hand Nestjs is opinionated , follows SOLID principles and has a proper architecture. It follows MVC(Model View Controller) architecture. Nestjs fully embraces typescript which helps in proper error handling and catching errors during development which is a great advantage while building big applications. Also *Typescript’s Decorators* in Nestjs enables meta programming. The core idea of meta programming  is to write code that writes or manipulates code, which helps automate repetitive tasks, reduce boilerplate, and add dynamic behavior to software. Nestjs has built in validation and pipes. Pipes automatically validate and transform the  input data before it goes to where it needs to go.

**Installation**   
Nestjs has its own CLI which makes it easier. Nest CLI is a command line interface tool that makes installation, development and maintenance of Nestjs application easier. Lets install the Nestjs CLI globally(*\-g*) :

```shell

npm install -g @nestjs/cli
```

Now lets create our new project using Nest .

```shell

nest new project-name
```

This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project.
