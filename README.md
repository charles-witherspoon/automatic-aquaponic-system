# AutomatedAquaponicSystem

## Deployment Steps
</br>

### On RaspberryPi

</br>
Update Pi

```
sudo apt update

sudo apt upgrade
```

Install php and apache2
```
sudo apt install php apache2 libapache2-mod-php -y

sudo a2enmod mpm_prefork && sudo a2enmod php7.0 && sudo a2enmod rewrite
```

Add mods for removing .php extension
```
sudo perl -i -pe 's/(?<=<VirtualHost \*:80>\n)/\t<Directory \/var\/www\/html>\n\t\tOptions Indexes FollowSymLinks\n\t\tAllowOverride All\n\t\tRequire all granted\n\t<\/Directory>\n/' /etc/apache2/sites-available/000-default.conf


echo "RewriteEngine on\nRewriteRule ^sockets$ sockets.php [NC]\nRewriteRule ^plants$ plants.php [NC]\nRewriteRule ^types$ types.php [NC]\nRewriteRule ^schedules$ schedules.php [NC]" > /var/www/html/.htaccess
```
</br>

### On build machine
</br>

Download code

Install git and npm
```
git clone https://github.com/charles-witherspoon/automatic-aquaponic-system.git
```
Move the files in the automatic-aquaponic-system/php folder to /var/www/html/ on the pi device; make sure to update the database file location in each of the PHP files

Put dist/automatic-aquaponic-system files in /var/www/html/
```
npm i -g @angular/cli
ng build --base-href ./
```

This generates a dist folder; move the contents of dist/automatic-aquaponic-system to /var/www/html/ on the pi device

</br>

### Back on RasPi
</br>

Restart Apache server
```
sudo service apache2 restart 
```
