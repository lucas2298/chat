#!/usr/bin/python
# -*- coding: utf8 -*-

#Import library
from pycode.running import response
import sys, getopt
def main(argv):
    argument = ''
    usage = 'usage: myscript.py -f <sometext>'
    # parse incoming arguments
    try:    
        opts, args = getopt.getopt(argv,"hf:",["foo="])
    except getopt.GetoptError:
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            print(usage)
            sys.exit()
        elif opt in ("-f", "--foo"):
            argument = arg
    # print output
    # print("ok")
    messRes = response(argument)
    print(messRes)
    
if __name__ == "__main__":
    main(sys.argv[1:])