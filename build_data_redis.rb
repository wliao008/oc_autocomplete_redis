#require 'rubygems'
require "redis"

def by_word(line, r, redis_sorted_set_key)
	array = line.downcase.gsub!(/ - /, ' ').split(' ')
	len = array.length - 1
	(0..len).each {|n|
		val = array[-(len-n)..-1].join(' ') + "$#{line.chop}"
		r.zadd(redis_sorted_set_key,0,val)
	}
end

def by_character(line,r, redis_sorted_set_key)
	array = line.downcase.gsub!(/ - /, ' ').split('')
	len = array.length - 1
	(0..len).each{|n|
		char = array.slice(0,1).join
		if char != ' '
			val = array.join() + "$#{line.chop}"
			r.zadd(redis_sorted_set_key,0,val)
		end
		array.shift
	}

end

def do_work(data_file, redis_sorted_set_key)
	r = Redis.new
	f = File.open(data_file, 'r')
	f.each_line do |line|
		by_word(line, r, redis_sorted_set_key)
	end
	f.close
end

#do_work

if ARGV.length < 2
	puts 'USAGE: ruby [ruby_script] [data_file] [redis_sorted_set_key]'
else
	data_file = ARGV[0]
	redis_sorted_set_key = ARGV[1]
	do_work(data_file, redis_sorted_set_key)
end