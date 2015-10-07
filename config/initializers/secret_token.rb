# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.


# Rollify::Application.config.secret_key_base = '1006c3bf2146404632544fb1564ee47b00a4cd924ae64dd8ed99cf96564e687fcdc54faa7b40918cca7966575bcb42ea866bff6ef5063cc2b950f01c499c7e11'
Rollify::Application.config.secret_key_base = CONFIG[:secret_key_base]
