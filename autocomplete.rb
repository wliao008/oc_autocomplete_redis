require 'rubygems'
require "redis"

def stub(line, r)
	array = line.downcase.gsub!(/ - /, ' ').split(' ')
	len = array.length - 1
	(0..len).each {|n|
		val = array[-(len-n)..-1].join(' ')
		r.zadd('icd9',0,val)
	}
	puts
end


r = Redis.new
f = File.open('shortlist.txt', 'r')
f.each_line do |line|
	stub(line, r)
end
f.close
