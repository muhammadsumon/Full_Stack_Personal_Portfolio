// material
import { Box } from '@mui/material';
//
import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';

// ----------------------------------------------------------------------

const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];
const FORMAT_VIDEO = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];
const FORMAT_WORD = ['doc', 'docx'];
const FORMAT_EXCEL = ['xls', 'xlsx'];
const FORMAT_POWERPOINT = ['ppt', 'pptx'];
const FORMAT_PDF = ['pdf'];
const FORMAT_PHOTOSHOP = ['psd'];
const FORMAT_ILLUSTRATOR = ['ai', 'esp'];

export function getFileType(fileUrl) {
  return fileUrl.split('.').pop();
}

export function getFileName(fileUrl) {
  return fileUrl.substring(fileUrl.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, '');
}

export function getFileFullName(fileUrl) {
  return fileUrl.split('/').pop();
}

export function getFileFormat(fileUrl) {
  let format;

  switch (fileUrl.includes(getFileType(fileUrl))) {
    case FORMAT_IMG.includes(getFileType(fileUrl)):
      format = 'image';
      break;
    case FORMAT_VIDEO.includes(getFileType(fileUrl)):
      format = 'video';
      break;
    case FORMAT_WORD.includes(getFileType(fileUrl)):
      format = 'word';
      break;
    case FORMAT_EXCEL.includes(getFileType(fileUrl)):
      format = 'excel';
      break;
    case FORMAT_POWERPOINT.includes(getFileType(fileUrl)):
      format = 'powerpoint';
      break;
    case FORMAT_PDF.includes(getFileType(fileUrl)):
      format = 'pdf';
      break;
    case FORMAT_PHOTOSHOP.includes(getFileType(fileUrl)):
      format = 'photoshop';
      break;
    case FORMAT_ILLUSTRATOR.includes(getFileType(fileUrl)):
      format = 'illustrator';
      break;
    default:
      format = getFileType(fileUrl);
  }

  return format;
}

const getIcon = (name) => (
  <Box component="img" src={`/static/icons/file/${name}.svg`} alt={name} sx={{ width: 28, height: 28 }} />
);

export function getFileThumb(fileUrl) {
  let thumb;
  switch (getFileFormat(fileUrl)) {
    case 'image':
      thumb = <Box component="img" src={fileUrl} alt={fileUrl} sx={{ width: 1, height: 1 }} />;
      break;
    case 'video':
      thumb = getIcon('file_type_video');
      break;
    case 'word':
      thumb = getIcon('file_type_word');
      break;
    case 'excel':
      thumb = getIcon('file_type_excel');
      break;
    case 'powerpoint':
      thumb = getIcon('file_type_powerpoint');
      break;
    case 'pdf':
      thumb = getIcon('file_type_pdf');
      break;
    case 'photoshop':
      thumb = getIcon('file_type_photoshop');
      break;
    case 'illustrator':
      thumb = getIcon('file_type_ai');
      break;
    default:
      thumb = <Box component={Icon} icon={fileFill} sx={{ width: 28, height: 28 }} />;
  }
  return thumb;
}
