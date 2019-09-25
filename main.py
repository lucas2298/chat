#!/usr/bin/python
# -*- coding: utf8 -*-

#Import library
from pycode.running import response
import sys, getopt
import base64
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
    messRes = response(argument)
    # encodedBytes = base64.b64encode(messRes.encode("utf-8"))
    # encodedStr = str(encodedBytes, "utf-8")
    # print(encodedStr)
    print(messRes)
    
if __name__ == "__main__":
    main(sys.argv[1:])