import React from 'react'
import jsQR from 'jsqr'

type ScannerProps = {
  /**
   * size
   */
  size: number
  /**
   * Scan interval
   */
  interval?: number
  /**
   * Scan type
   */
  type: 'qrcode' | 'barcode'
  /**
   * Scan result callback
   */
  onScan: (result: string | null) => void
}

export default class Scanner extends React.Component<ScannerProps> {
  static defaultProps: Partial<ScannerProps> = {
    size: 500,
    interval: 500,
  }

  videoRef = React.createRef<HTMLVideoElement>()
  canvasRef = React.createRef<HTMLCanvasElement>()

  setup = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoInputDevices = devices.filter(
      device => device.kind === 'videoinput',
    )
    if (videoInputDevices.length === 0) {
      return
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        // deviceId: videoInputDevices[0].deviceId,
        // frameRate: { ideal: 25, min: 10 },
        // facingMode: { ideal: 'environment' },
        // width: this.props.size,
        // height: this.props.size,
      },
    })
    const $video = this.videoRef.current!
    $video.srcObject = stream
  }

  scan = () => {
    const $canvas = this.canvasRef.current!
    const context = $canvas.getContext('2d')!
    context.drawImage(this.videoRef.current!, 0, 0)
    const imageData = context.getImageData(0, 0, $canvas.width, $canvas.height)
    const result = jsQR(imageData.data, $canvas.width, $canvas.height)

    this.props.onScan(result ? result.data : null)
    setTimeout(() => {
      this.scan()
    }, this.props.interval!)
  }

  componentDidMount() {
    this.setup()
    this.scan()
  }

  render() {
    return (
      <>
        <video
          ref={this.videoRef}
          width={this.props.size}
          height={this.props.size}
        />
        <canvas
          // style={{ display: 'none' }}
          ref={this.canvasRef}
          width={this.props.size}
          height={this.props.size}
        />
      </>
    )
  }
}
