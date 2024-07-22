<?php
/**
 * Plugin Name:       Breaking Borders Block
 * Description:       Block with optional csv shapes to create different shapes for the background.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            frfry
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       kylee-new-blocks
 *
 * @package KyleeNewBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function kylee_new_blocks_breaking_borders_block_init() {
	register_block_type( __DIR__ . '/build/blocks/breaking-borders' );
	register_block_type( __DIR__ . '/build/blocks/gallery' );
	register_block_type( __DIR__ . '/build/blocks/gallery-img' );
	register_block_pattern_category('kylee', array(
	'label' => __('Kylee', 'kylee')
));
add_filter('block_categories_all', function ($categories) {
	array_unshift($categories, [
		'slug' => 'kylee',
		'title' => 'Kylee'
	]);
	return $categories;
});
}
add_action( 'init', 'kylee_new_blocks_breaking_borders_block_init' );
