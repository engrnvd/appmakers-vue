<?php
require_once __DIR__ . "/Str.php";

$topics = ['components', 'directives', 'filters', 'services', 'styles', 'utilities'];

function fileName($file)
{
    return preg_replace('/\..+$/', '', $file);
}

function slug($str)
{
    return Str::slug(Str::snake(fileName($str)));
}

function prepare($file, $topic, $subTopic)
{
    $content = file_get_contents(__DIR__ . "/" . $file);
    $content = str_replace('%topic%', $topic, $content);
    $content = str_replace('%sub-topic%', $subTopic, $content);
    $content = str_replace('%sub-topic-slug%', slug($subTopic), $content);
    $content = str_replace('%sub-topic-name%', fileName($subTopic), $content);
    return $content;
}

$routes = file_get_contents(__DIR__ . "/menu-routes.template");

foreach ($topics as $topic) {
    $viewsDir = __DIR__ . "/../src/views/{$topic}";
    $filesDir = __DIR__ . "/../../{$topic}";
    // create .vue file
    if (!file_exists($viewsDir)) {
        mkdir($viewsDir);
    }

    if (!file_exists($viewsDir . "/index.vue")) {
        $content = prepare("topic-component.template", $topic, "");
        file_put_contents($viewsDir . "/index.vue", $content);
    }

    // prepare route
    $route = prepare("topic.template", $topic, "");

    // get list of files
    $files = scandir($filesDir);

    foreach ($files as $file) {
        if ($file == '.' || $file == '..') continue;
        // create .vue file
        $vueFile = $viewsDir . "/".fileName($file)."Example.vue";
        if (!file_exists($vueFile)) {
            $content = prepare("sub-topic-component.template", $topic, $file);
            file_put_contents($vueFile, $content);
        }
        // prepare route
        $stub = "// sub-topic-goes-here";
        $subRoute = prepare("sub-topic.template", $topic, $file);
        $route = str_replace($stub, $subRoute . $stub, $route);
    }
    echo $route;
    // insert route
    $routesFile = __DIR__ . "/../src/router/menu-routes.js";
    $stub = "// topics go here";
    $routes = str_replace($stub, $route . $stub, $routes);
    file_put_contents($routesFile, $routes);
}


