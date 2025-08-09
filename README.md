# Bodgeit
Start the docker container
```bash
docker run --rm -p 8080:8080 -i -t securecodebox/bodgeit:latest
```
# user-handler
npx playwright test tests/bodgeit-registration.spec.ts --project=chromium