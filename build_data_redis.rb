#require 'rubygems'
require "redis"

def by_word(line, r)
	array = line.downcase.gsub!(/ - /, ' ').split(' ')
	len = array.length - 1
	(0..len).each {|n|
		val = array[-(len-n)..-1].join(' ') + "$#{line.chop}"
		r.zadd('icd9',0,val)
	}
end

def by_character(line,r)
	array = line.downcase.gsub!(/ - /, ' ').split('')
	len = array.length - 1
	(0..len).each{|n|
		char = array.slice(0,1).join
		if char != ' '
			val = array.join() + "$#{line.chop}"
			r.zadd('icd9',0,val)
		end
		array.shift
	}

end

def do_work()
	r = Redis.new
	f = File.open('list.txt', 'r')
	f.each_line do |line|
		by_word(line, r)
	end
	f.close
end

do_work