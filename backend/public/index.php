<?php
/**
 * Homepage file
 * 
 * @package Auction Web Application
 * @since 1.0.0
 */
include 'header.php';
?>

<body class="auction-web">
    <div class="aweb-top-header">
        <span class="email-label">
            <?php echo filter_var( 'Email: ', FILTER_SANITIZE_STRING ); ?>
        </span>
        <span class="email-content">
            <?php echo filter_var( 'auction.web@gmail.com', FILTER_SANITIZE_EMAIL ); ?>
        </span>
    </div><!-- aweb-top-header -->

    <header id="main-header" class="aweb-main-header">
        <h1 class="aweb-site-title"><?php echo filter_var( 'Auction Web', FILTER_SANITIZE_STRING ); ?></h1>
    </header><!-- #main-header -->
<?php
include 'footer.php';