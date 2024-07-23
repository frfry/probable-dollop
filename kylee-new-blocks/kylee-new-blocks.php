<?php
/**
 * Plugin Name:       Kylee New Blocks
 * Description:       Plugin with a few custom built blocks and features
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


if (!defined('ABSPATH')) {
	die('Silence is golden.');
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
final class KyleeNewBlocks 
{
	static function init()
	{
		add_action('enqueue_block_assets', function () {
			//wp_enqueue_style("dashicons");
			$style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style('kylee-new-blocks-style', $style_url, array());
		});
		add_action('init', function (){
			add_filter('block_categories_all', function ($categories) {
				array_unshift($categories, [
					'slug' => 'kylee',
					'title' => 'Kylee'
				]);
				return $categories;
			});
			register_block_type( __DIR__ . '/build/blocks/breaking-borders' );
			register_block_type( __DIR__ . '/build/blocks/gallery' );
			register_block_type( __DIR__ . '/build/blocks/gallery-img' );
			register_block_pattern_category('kylee', array(
				'label' => __('Kylee', 'kylee')
			));
			
			$script_url = plugins_url('build/index.js', __FILE__);
			wp_enqueue_script('kylee-new-blocks-index', $script_url, array('wp-blocks', 'wp-element', 'wp-editor'));

			$style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style('kylee-new-blocks-style', $style_url, array());
		
		});
	}
}

KyleeNewBlocks::init();
