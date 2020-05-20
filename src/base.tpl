<!doctype html>
{var $assets = '/sites/s1/frontend/dist/'}
<html lang="ru">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {include 'file:elements/chunks/_head.tpl'}
</head>

<body>
{include 'file:elements/chunks/_navbar.tpl'}

<main role="main">
    {block 'content'}
        {$_modx->resource.content}
    {/block}
</main>

{include 'file:elements/chunks/_footer.tpl'}
{include 'file:elements/chunks/Modals/Requests/ls__tpl_Modal_request.tpl'}
{include 'file:elements/chunks/Modals/Products/ls__tpl_Modal_product_info.tpl'}
{include 'file:elements/chunks/Modals/Products/ls__tpl_ModalThank.tpl'}

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script>
    if(typeof jQuery == "undefined"){
        document.write('<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous" ></'+'script>');
    }
</script>
<script src="{'assets_url' | option}components/easycomm/js/{'ec_frontend_js' | option}"></script>

{include 'file:elements/chunks/Services/analytics.tpl'}
</body>
</html>