<?
$uri = explode('/', $_SERVER['REQUEST_URI']);
$template = (empty($uri[1])) ? 'home' : $uri[1];

require_once('header.html');
require_once('template/'. $template . '.html');
require_once('footer.html');