
# Set the context
WEBPACK_CONFIG='src/environments/environment.staging.ts';
ENV="staging"
KUBE_DEPLOY="/Users/alessandrodonateo/dev/fsp/k8s/deploy.sh"
DOCKER_IMAGE="ionic-backend"
DOCKER_IMAGE_LOCAL=$DOCKER_IMAGE
DOCKER_REPOSITORY="donateoa"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')


# Set variable of context by the parameters
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   
    case "$KEY" in
            cluster)       P_CLUSTER=${VALUE} ;;
            addVersion)    P_NEW_TAG_VERSION="addVersion" ;;     
            *)   
    esac    
done
# validation context
# check if is empty
if [[ -z "$P_CLUSTER" ]]; then
    P_CLUSTER="staging";
fi 

if [[ -z "$P_NEW_TAG_VERSION" ]]; then
    P_NEW_TAG_VERSION="SkipVersion";
fi 

if [ "$P_CLUSTER" != "production" ] ; then
    P_CLUSTER="staging";
fi   

if [ "$P_NEW_TAG_VERSION" != "addVersion" ] ; then
    P_NEW_TAG_VERSION="skipVersion";
fi

if [ "$P_CLUSTER" = "production" ] ; then
        WEBPACK_CONFIG='src/environments/environment.prod.ts';
        ENV="production"

fi
if [ "$P_CLUSTER" = "staging" ] ; then
        DOCKER_IMAGE="$DOCKER_IMAGE-staging"

fi
echo "----------------------------------------------------------------------";
echo "------------- Run deploy script with follow parameter ----------------";
echo "----------------------------------------------------------------------";
echo "          cluster: \t $P_CLUSTER"
echo "          addVersion: \t $P_NEW_TAG_VERSION"
echo "----------------------------------------------------------------------";
echo "-------------- and the follow context --------------------------------"
echo "----------------------------------------------------------------------";
echo "          API_URL: \t\t $API_URL"
echo "          WEBPACK_CONFIG: \t $WEBPACK_CONFIG"
echo "          PACKAGE_VERSION: \t $PACKAGE_VERSION"
echo "----------------------------------------------------------------------"
echo "You are going to deploy with the above parambers. Are you sure?"
echo "Press Q to quite any key to continue\t\t:\c"
read input 
if [[ $input = "Q" ]] || [[ $input = "q" ]] ; then
     echo "Program aborted." 
    exit;
fi
# Change api url in webpack config file
# if perl -i -pe "s/$API_URL_TO_REPLACE/$API_URL/" $WEBPACK_CONFIG ; then 
#     echo "API_URL added to $WEBPACK_CONFIG.";
# else
#     echo "Error writing $WEBPACK_CONFIG!!!!!!!"
#     exit;    
# fi
if [ $P_NEW_TAG_VERSION = "addVersion" ] ; then
    git add -A
    MESSAGE="Prepare build for version $PACKAGE_VERSION. Commit working copy."
    git commit -am "$MESSAGE";
    npm version patch
fi    

    ENVIRONMENT_VERSION=$(cat $WEBPACK_CONFIG \
    | grep VERSION \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')

 PACKAGE_VERSION=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')

# set version to environment
    if perl -i -pe "s/$ENVIRONMENT_VERSION/'$PACKAGE_VERSION'/" $WEBPACK_CONFIG ; then
        echo "VERSION added to $WEBPACK_CONFIG.";
    else
        echo "Error writing VERSION on  $WEBPACK_CONFIG!!!!!!!"
        exit;
    fi

    if yarn build --prod --configuration=$ENV ; then
        if firebase deploy ; then
            echo "deploy succesfull."
        else 
            echo "deploy failed"
        fi
    else
        echo "Build failed"
    fi