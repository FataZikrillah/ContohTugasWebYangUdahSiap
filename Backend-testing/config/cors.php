
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi Cross-Origin Resource Sharing (CORS)
    |------------------------------------------------------------------------
    |
    | Di sini Anda dapat mengonfigurasi pengaturan untuk berbagi sumber daya     |  lintas asal
    | atau "CORS". Ini menentukan operasi lintas asal apa yang dapat             |  dieksekusi
    | di browser web. Anda bebas menyesuaikan pengaturan ini sesuai              |  kebutuhan.
    |
    | Untuk mempelajari lebih lanjut: https://developer.mozilla.org/en-          |  US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
