## Как запустить?

```
Сначала заполните .env variables:

BASE_URL=https://common-api.wildberries.ru/api/v1

API_KEY=(ключ)

GOOGLE_SERVICE_ACCOUNT=(содержимое сервисного файла в формате base64)

GOOGLE_API_SCOPE=https://www.googleapis.com/auth/spreadsheets

GOOGLE_SHEETS_SORT_BY=boxDeliveryBase(коэффициент для сортировки sheets из API)

GOOGLE_SHEET_ID_LIST=(Список id sheets через запятую (например: Asdc23432,ASsadasdas,AW32sdc))
```

Затем вызовите docker compose up

```
Для проверки работы есть endpoint (чтобы не ждать пока придет час для обновления данных):
/api/v1/tariffs/box/
Должно обновить данные на сегоднящний день и выгрузить на sheets

Если возвращает статус 200 OK, значит все прошло успешно
```

У меня возникла проблема с 5000 портом в системе(видимо занят другим сервисом поэтому я использовал 4000)