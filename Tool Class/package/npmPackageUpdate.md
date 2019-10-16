[TOC]

# Npm Package Update

## First programme

```
// need install a package "npm-check-updates"
npm i -g npm-check-updates
// upgrade package（yarn.lock & package.json can synchronized updates）
ncu --upgrade --upgradeAll && yarn upgrade
```

## Second programme

```shell
yarn upgrade-interactive --latest
```

### Operation

Manual selection of upgraded dependency packages

- `<space>` Choice  
- `<a>` Choose all
- `<i>` Reverse

### Color for package

- `<red>`: Major Update backward-incompatible updates 
- `<yellow>`: Minor Update backward-compatible features 
- `<green>`: Patch Update backward-compatible bug fixes

## Final

use Second programme can have better choice.