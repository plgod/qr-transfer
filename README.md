# QR Transfer - Better than emailing yourself

This project is a small utility web app used to transfer URLs and plain text from one device to another.

This web app requires [the backend project](https://github.com/plgod/qr-transfer-node) to be deployed and accessible.

## How to use

Follow along with the live app at http://bit.ly/qr-transfer.

1. Open the app on one device (e.g. your computer). A unique QR code will be displayed.
1. Scan this QR code from a device with a camera (e.g. your phone). You will land on the same page with the same QR code on the same-colored background.
1. On either device, you can now enter something in the text box and hit Send to have it show up on the other one. (If it's an URL, both devices will instead be redirected there unless the checkbox in unchecked)

## Other features that are totally not side-effects

- You are not limited to 2 devices. You can scan the QR code from any number of devices and they will all receive the data sent from any device.
- You can link 2 devices that don't have a camera by using your phone to redirect one of them to the other's page. See in-app instructions.

## Known issues

### No error management

The app is optimistic and expects everything to work. Behavior in case of internal or external error is undefined.
