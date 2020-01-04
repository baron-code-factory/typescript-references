
## これは?
ほかの プロジェクトを参照する際の注意点など...

## 全体像

```bash
➜ lsd --tree --depth 2
  .
├──   a.json
├──   client
│  ├──   node_modules
│  ├──   package.json
│  ├──   src
│  ├──   tsconfig.json
│  └──   yarn.lock
├──   README.md
└──   shared
   ├──   node_modules
   ├──   package.json
   ├──   src
   ├──   tsconfig.json
   ├──   x.ts
   └──   yarn.lock
```


## 背景 や 前提条件

`client/` から `shared/` 参照したい

`yarn workspace` は **無し**

## この際の設定や注意点

### `client/tsconfig.json`

```json
"compilerOptions": {
    // distだけだと バッティングが怖い
    "outDir": "../dist/client"

    // ここより上は参照不可能
    // 思わぬファイル出力される場合あるしつけとけよ
    "rootDir": "src" 

    // import の時のパス
    // こんなのができる
    // import {some} from "src/foo/some"
    // tsc した際の解決はないので それは 別途考慮が必要
    // "." 以外はやめといたほうがいい !!!!!!!!!!!!!!
    "baseUrl": "."

    // tsc した際の解決はないので それは 別途考慮が必要
    "paths": {
        // これらを使いたいならば バベルをいれとけ !!!!!!!!!!!!!!
        // 開発中は OK tsc 後は動かない
        "~@shared/*": [
        "../dist/shared/*",
        "../shared/*",
        ],
        "shared/*": [
        "../dist/shared/*",
        "../shared/*"
        ]
    },   
}
"references": [
    // shared import する時に必要
    { "path": "../shared" }
],
```

### `shared/tsconfig.json`

```json
"compilerOptions": {
    // 参照される場合必要
    "composite": true,
}
```

### `tsconfig.some.json`

exteds して使う

あまり使わないほうがいい

つかうなら  `baseUrl` を `"."` にする  
こうすると `tsconfig.some.json` がある  
所基準になり、 `outDir` なども ひっぱられる

つかうなら
strict を厳しくぐらいの継承が良いか
