# Get CONFIG variables differentially in dev/test and production environments
        # if Rails.env == 'test'

        if Rails.env == 'development' || Rails.env == 'test'
                CONFIG = {}

         # elsif Rails.env == 'development' || Rails.env == 'production'
        elsif Rails.env == 'production' 
        # Get paths to relevant encryption CONFIG files
            ymlfile_paths = YAML.load(File.read('/rails/.deploysuite/rails_ymlfiles.yml'))
            cipher_yml = ymlfile_paths[:paths][:cipher_yml]
            encrypted_db_yml = ymlfile_paths[:paths][:encrypted_db_yml]

            cipher_params = YAML.load(File.read(cipher_yml))
            key = cipher_params[:key]
            iv = cipher_params[:iv]
            alg =cipher_params[:alg]

            # Decode encoded db file into temp application2.yml
            decipher = OpenSSL::Cipher.new(alg)
            decipher.decrypt
            decipher.key = key
            decipher.iv = iv
            File.open(File.expand_path('../application2.yml', __FILE__), 'wb') do |dec|
                File.open(encrypted_db_yml, 'rb') do |f|
                    loop do
                        r = f.read(4096)
                        break unless r
                        decoded = decipher.update(r)
                        dec << decoded
                    end
                end

                dec << decipher.final
            end

        # Create CONFIG[:foo] constants from temp application2.yml
            CONFIG = YAML.load(File.read(File.expand_path('../application2.yml', __FILE__)))
            CONFIG.merge! CONFIG.fetch(Rails.env, {})
            CONFIG.symbolize_keys!

        # Delete temp application2.yml
            File.delete(File.expand_path('../application2.yml', __FILE__)) 
        end