image_folder=./src/static/images/

mkdir -p ${image_folder}thumbnails

for file in ${image_folder}projects/*.{jpg,png}; do
  base=$(basename $file)
  echo ${base%.*}
  convert $file ${image_folder}thumbnails/${base%.*}.jpg
  done;


for file in ${image_folder}projects/**/*; do
  folder=$(basename $(dirname $file))
  base=$(basename $file)

  mkdir -p ${image_folder}thumbnails/$folder

  convert $file ${image_folder}thumbnails/$folder/${base%.*}.jpg
  done;

svgo -f ${image_folder} -o ${image_folder}