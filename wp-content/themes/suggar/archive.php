<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package auaha
 */

get_header();
if (is_category()) {
    // Obtém o ID da categoria atual
    $categoria_atual_id = get_queried_object_id();

    // Faça o que você quiser com o ID da categoria, por exemplo, exiba-o
    $categoria_atual_titulo = single_cat_title('', false);

    // Agora você pode usar $categoria_atual_id em outras consultas ou operações
}
?>

<script>
    var category_info = {
        id: <?php echo json_encode($categoria_atual_id); ?>,
        title: '<?php echo $categoria_atual_titulo; ?>'
    }
</script>

<div id="root_archive"></div>
<?php
get_footer();
