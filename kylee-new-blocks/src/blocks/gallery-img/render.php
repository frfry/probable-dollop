<?php 
$image_exists = $attributes['imageId'] ?? null;
$block_wrapper_attributes = get_block_wrapper_attributes([
       'style' => 'display: ' . ($image_exists ? 'block' : 'none')
]);
$img_uri = wp_get_attachment_image_url($attributes['imageId'] ?? 0);
$img_uri_large = wp_get_attachment_image_url($attributes['imageId'] ?? 0, "large");

?>

<div <?php echo $block_wrapper_attributes ?>>
    
       <img data-large-size="<?php echo $img_uri_large ?>" src="<?php echo $img_uri ?>" class="thumb" />
    
</div>