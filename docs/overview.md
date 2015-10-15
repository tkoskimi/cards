A simple database application with the authentication and tests
===============================================================

*	[ToDo](#todo)
*	[Server Requirements](#server-requirements)
*	[Build Requirements](#build-requirements)
*	[Building](#build)
*	[Deployment](#deployment)
*	[Architecture](#architecture)

<a name="todo"></a>
----
ToDo
----
*	Create a new Laravel project
*	Build the API doc
*	Add PHPlint
*	Define a test and a prod configurations
*	Define the rest API
*	Define the database structure
*	Define the test cases

<a href="server-requirements"></a>
-------------------
Server Requirements
-------------------
[See](http://laravel.com/docs/5.0)

*	PHP >= 5.4
*	Mcrypt PHP Extension
*	OpenSSL PHP Extension
*	Mbstring PHP Extension
*	Tokenizer PHP Extension

<a href="build-requirements"></a>
------------------
Build Requirements
------------------
###PHP
The version 5.3.7 or newer.

[Installation](http://laravel.com/docs/5.0)

###### Example. Check the configuration
'echo '<?php phpinfo(); ?>' | php | less'

###Composer
A package manager for PHP. The Laravel uses Composer to handle its dependencies.

[Installation](http://laravel.com/docs/5.0)

###### Example. Local installation used in this project
`$ curl -sS https://getcomposer.org/installer | php -- --install-dir=bin`

###### Example. How to use it
`$ php bin/composer.phar --version`

###Laravel
An application framework for PHP

[Installation](http://laravel.com/docs/5.0)

###### Example. Local installation used in this project
I added `~/.composer/vendor/bin` to my `~/.bashrc` and restarted the terminal. Then I used Composer: `$ bin/composer.phar global require "laravel/installer=~1.1"`. The Laravel is now installed to the `~/.composer/...` folder.

###### Example. The new application
`~/project/cards/dev/src$ laravel new cards`

I use this specific folder structure. Probably you want to use a simpler one.

Remember to rename the `.env.example` file to `.env` and generate a key for the application:

`php artisan key:generate`

Check that the generated key ends up to the file.

### Grunt
Grunt is a JavaScript task runner. In this project Grunt is used to execute lint and doc tasks. However, the goal is to replace Makefile with Gruntfile.

[Installation](http://gruntjs.com/getting-started)

###### Example
First you have to install the command line interface:

`$ npm install -g grunt-cli`

Then create the `package.json` file and install Grunt.

`$ npm install grunt --save-dev`

Grunt will then be added as a dependency of your project.

#### PHP Code Sniffer
[Installation](https://www.npmjs.com/package/grunt-phpcs)

###### Example
The Sniffer is a PHP program. Hence, it need a plugin so that Grunt can spawn it. The installation is easy.

*	Install the Grunt plugin
*	Install the sniffer itself: `$ php bin/composer.phar install`
*	Add task to Gruntfile.js

To execute PHPCS use the command

`$ grunt phpcs`

#### PHP Lint
[Installation](https://www.npmjs.com/package/grunt-phplint)

#### PHPUnit
[PHP Installation](https://phpunit.de/manual/current/en/installation.html)
[Grunt Installation](https://www.npmjs.com/package/grunt-phpunit)

Noticed that I removed the Laravel's phpunit.xml file.

#### PHPMD
Mess detector.

[Installation](https://www.npmjs.com/package/grunt-phpmd)

Excluding the folders was bit a problem. Finally I found the correct format:
`*/dev/src/app/folder1,*/dev/src/app/folder2`

There should not be a whitespace in the comma separated list.

#### PHPDocumentor
[PHP Installation](http://www.phpdoc.org/)
[Grunt Installation](https://www.npmjs.com/package/grunt-phpdocumentor)

Unfortunately the plugin doesn't support ignore parameter and hence it is almost useless. I followed this [solution](http://mariehogebrandt.se/articles/using-grunt-php-quality-assurance-tools/) that replaces the Grunt plugin with a task.

###### Example
I got an error 'The XSL writer was unable to find your XSLTProcessor'. I installed a new packet:

`sudo apt-get install libxslt1-dev`

and build PHP again with `--with-xsl`.

#### Grunt-mkdir
Create directories with Grunt.

[Installation](https://www.npmjs.com/package/grunt-mkdir)

#### Clean
Cleans files and folders.

[Installation](https://www.npmjs.com/package/grunt-contrib-clean)

#### Grunt-Shell
[Installation](https://www.npmjs.com/package/grunt-shell)

<a href="architecture"></a>
------------
Architecture
------------

One should not commit the dependencies in the vendor directory (see composer [faq](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md))

<a href="trouble-shooting"></a>
----------------
Trouble Shooting
----------------
*	Fatal Error: Class 'ZipArchive' no found. This is because of a missing zip extansion. You need to recompile the PHP. I did with the following configuration:

```
./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-openssl --with-pgsql --enable-mbstring --enable-zip
make
make test
sudo make install
```

*	I tried PHPCPD but I couldn't get it work: There were out of memory errors. I increased the heap, but still there were errors.

*	If you have warnings like `PHP Warning: date_default_timezone_get()`, you have to define the default timezone in your php.ini. For example, `date.timezone = 'Europe/Helsinki'`
*	If your PHP runs out of memory, you can increase the heap size from your php.ini 

