# clone-tabnews


## Executar a aplicação localmente

incialize o servidor web na porta 3000

```bash
mpn run dev
```


inicialize o banco postgres

```bash
podman-compose -f  infra/compose.yaml up -d
```


execute os testes em watch mode

```bash
npm run test:watch
```

