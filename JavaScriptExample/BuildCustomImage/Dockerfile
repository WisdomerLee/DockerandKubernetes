#FROM으로 기본으로 쓸 Image를 알려줌 : 해당 Image의 이름...?
FROM node
#아래의 명령어는 모든 실행 명령이 어플리케이션이 실행되는 폴더 내에서 실행되어야 함을 알려줌
WORKDIR /app
#먼저 package의 정보를 복사해두고
COPY package.json /app

#npm이 필요함... : WORKDIR의 설정이 없으면 시스템 폴더 등에 설치하려고 시도하게 될 것임... WORKDIR로 이 설치도 역시 
#아래는 코드 실행에 필요한 환경을 설치, 구축하는 것 : 환경 설정하는 부분을 코드 복사보다 먼저 두면...?
RUN npm install

#복사하기 : 첫번째 경로는 Dockerfile을 포함하는 같은 폴더라는 것을 .으로 표시 : Dockerfile을 제외한 모든 파일이 Image에 복사
#두번째 경로는 생성된 이미지의 경로 .은 Dockerfile이 있는 폴더
#만약에 두번째 경로로 지정된 폴더가 없는 경우 : Image를 만들 때 같이 생성되어 폴더를 만들고 그곳에 Image가 만들어짐
#WORKDIR이 없었다면 아래의 COPY도 COPY . /app이되어야 함, COPY . .으로 처리하여도 됨
#COPY를 통해 코드를 복사
COPY . /app



#내부에 있는 것을 외부 환경으로 보여주기 위해: js내부 파일에서 80 포트를 쓰고 있으므로 해당 포트를 우리의 실행 환경에 노출시키겠다고 문서로 써두기만 한 것이고 아무것도 하지 않음
EXPOSE 80

#이미지를 기반으로 컨테이너가 시작될 때만 실행되도록 하는 명령어 CMD 
CMD ["node", "server.js"]

#docker를 통해 Image를 build시키고 그냥 docker run "빌드된 ID"로 실행하면 80포트에 접근이 안 됨
#docker에서 실행할 때 docker run -p 컴퓨터포트아무숫자:80(EXPOSE에 쓰인 숫자) "빌드된 ID"
#만약 ID가 있으면 해당 이미지는 ID에 쓰인 대로 생성되게 됨 > 없으면 숫자형태의 ID가 생성
#이미지는 기본적으로 읽기 속성이며 수정이 안 됨...?> 그럼 일부를 수정할 때마다 Image를 통째로 다시 만들어야 하는가??
#빌드 한 이후엔 코드를 아무리 수정해도 Image에 반영되지 않음
