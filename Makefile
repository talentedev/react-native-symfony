up:
	./scripts/up.sh

down:
	docker-compose down

backend-bash:
	docker-compose exec backend bash

test:
	docker-compose exec backend bash -c "composer csfix && composer cscheck && composer phpstan"
	cd ./sources/app && yarn lint-fix && yarn prettier-fix

test-front:
	cd ./sources/app && yarn lint-fix && yarn prettier-fix

test-back:
	docker-compose exec backend bash -c "composer csfix && composer cscheck && composer phpstan"
