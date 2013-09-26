#!/usr/bin/env ruby
require 'bundler'
Bundler.require

provider = Polterheist::TheMLS.new

puts "Attempting to locate property at #{ARGV[0]} using #{provider.class}"

if result = provider.locate_property(ARGV[0])
  doc = Nokogiri::HTML.parse(result)
  img_src = doc.css(".mainImage img").first.attr :src
  require 'pry'
  binding.pry
end
