# The path of the JavaScript source code files
PHP_SRC = $(wildcard dev/src/cards/)
# Grunt
GRUNT = 

ifeq ($(SERVER),)
	SERVER = default
endif

clean:
	@echo ""
	@echo "## CLEAN ##"
	rm -rf ./build
	rm -rf ./dist

build_paths:
	@echo ""
	@echo "## BUILD PATHS ##"
	mkdir "./build"
	mkdir "./build/dev"
	mkdir "./build/dev/src"
	mkdir "./dist"

test_paths:
	@echo ""
	@echo "## TEST PATHS ##"
	mkdir "./build/test"
	mkdir "./build/test/src"

phpdoc:
	$(PHPDOC)

test: clean build_paths build test_paths
	@echo ""
	@echo "## TEST ##"
	$(JSHINT) $(JS_SRC_UNIT_TEST)
	$(JSCS) $(JS_SRC_UNIT_TEST)

	cp -r "./test/html/css" "./build/dev/html/"
	cp -r "./test/html/libs" "./build/dev/html/"
	cp -r "./test/html/js" "./build/test/html/"
	cp "./test/html/test.html" "./build/dev/html/test.html"

build: clean build_paths
	echo $(PHP_SRC)
	$(PHPLINT) $(PHP_SRC)

	cp "./dev/html/index.html" "./build/dev/html"
	cp -r "./dev/html/css" "./build/dev/html/"
	cp -r "./dev/html/js" "./build/dev/html/"
	cp -r "./dev/html/libs" "./build/dev/html/"
	cp -r "./dev/html/templates" "./build/dev/html/"
	cp "./dev/html/config/$(SERVER)/app/config.json" "./build/dev/html/config.json"