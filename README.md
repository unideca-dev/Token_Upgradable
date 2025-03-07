# 토큰 업그레이더블 컨트랙트

확인할 수 있는 컨트랙트 코드의 리스트를 다음과 같이 정리한다.
```
+-- contracts
    +-- TokenProxy.sol
    +-- TokenUpgradeable.sol
    +-- TokenBurnableUpgradeable.sol
```

## TokenProxy

데이터를 저장하는 Storage Contract다.
fallback 함수 내에서 `delegateCall`를 통해 logic Contract의 함수를 실행시킨다.

## TokenUpgradeable

ERC20 표준에 맞게 작동하는 로직을 구현하고 있는 Logic Contract다.
TokenProxy의 `delegateCall`을 통해 전달받은 bytes 데이터를 실행시킨다.
`upgradeToAndCall` 함수를 통해서 다른 컨트랙트로 업그레이드(대체) 될 수 있다.

## TokenBurnableUpgradeable

TokenUpgradeable에서 Burn 기능이 추가된 Contract다.
업그레이드 가능한 함수 `upgradeToAndCall` 구현하고 있다.

# 작동 방법
```bash
# 의존성 설치
yarn install

# 코드 테스트
yarn hardhat test
```

# 토큰 배포 방법
## 환경변수 설정
```bash
# RPC 노드 API 키 등록
yarn hardhat vars set NODE_REAL_API_KEY {API 키 값 붙여넣기}

# 지갑 개인키 등록
yarn hardhat vars set BSC_WALLET_PK {지갑 개인키 값 붙여넣기}
```

## 배포 명령어
```bash
# bsc testnet 배포
yarn deploy bsc-testnet

# bsc mainnet 배포
yarn deploy bsc
```

## 컨트랙트 인증 방법
