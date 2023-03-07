API Description

This API usees https://v3.admin-shell-io.com/swagger/index.html as an example.

The main API functions are divided in their according subfolders.
All subfolder must include:
- .htaccess
- functions.php
- index.php

The .htacces is used to redirect html calls to the dynamic index.php
In the functions.php the main function for this submodel type should be implemented
The index.php should begin with "require_once '../globalFunktions.php';" to load all dependent functions.