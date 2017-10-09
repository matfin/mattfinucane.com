import * as video from './video';
import * as utils from './utils';
import * as sinon from 'sinon';

describe('video', () => {

  it('should set a standard video', () => {
    const stub_getVideoParams = sinon.stub(utils, 'getVideoParams');
    const stub_getAttribute = sinon.stub();
    const stub_setAttribute = sinon.stub();
    const stub_createElement = sinon.stub(document, 'createElement').returns({
      setAttribute: stub_setAttribute
    });
    const stub_play = sinon.stub();
    const stub_appendChild = sinon.stub();
    const node = {
      getAttribute: stub_getAttribute,
      setAttribute: stub_setAttribute,
      appendChild: stub_appendChild,
      play: stub_play
    };

    stub_getAttribute.withArgs('data-base-url').returns('http://base.test');
    stub_getAttribute.withArgs('data-video').returns('test-name');

    stub_getVideoParams.onCall(0).returns({
      width: 320,
      wide: false,
      pixel_ratio: 1
    });
    video.setVideo(node);

    expect(stub_getAttribute.getCall(0).args[0]).toEqual('data-base-url');
    expect(stub_getAttribute.getCall(1).args[0]).toEqual('data-video');

    expect(stub_setAttribute.callCount).toEqual(7);
    expect(stub_appendChild.callCount).toEqual(3);

    expect(stub_setAttribute.getCall(0).args[0]).toEqual('poster');
    expect(stub_setAttribute.getCall(0).args[1]).toEqual('http://base.test/w_320,br_3m/test-name.jpg');

    expect(stub_setAttribute.getCall(1).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(1).args[1]).toEqual('http://base.test/w_320,br_3m/test-name.webm');
    expect(stub_setAttribute.getCall(2).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(2).args[1]).toEqual('video/webm');

    expect(stub_setAttribute.getCall(3).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(3).args[1]).toEqual('http://base.test/w_320,br_3m/test-name.mp4');
    expect(stub_setAttribute.getCall(4).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(4).args[1]).toEqual('video/mp4');

    expect(stub_setAttribute.getCall(5).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(5).args[1]).toEqual('http://base.test/w_320,br_3m/test-name.ogv');
    expect(stub_setAttribute.getCall(6).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(6).args[1]).toEqual('video/ogg');

    expect(stub_play.callCount).toEqual(1);

    stub_getVideoParams.restore();
    stub_createElement.restore();
  });

  it('should set a wide video', () => {
    const stub_getVideoParams = sinon.stub(utils, 'getVideoParams');
    const stub_getAttribute = sinon.stub();
    const stub_setAttribute = sinon.stub();
    const stub_createElement = sinon.stub(document, 'createElement').returns({
      setAttribute: stub_setAttribute
    });
    const stub_play = sinon.stub();
    const stub_appendChild = sinon.stub();
    const node = {
      getAttribute: stub_getAttribute,
      setAttribute: stub_setAttribute,
      appendChild: stub_appendChild,
      play: stub_play
    };

    stub_getAttribute.withArgs('data-base-url').returns('http://base.test');
    stub_getAttribute.withArgs('data-video').returns('test-name');

    stub_getVideoParams.onCall(0).returns({
      width: 2560,
      wide: true,
      pixel_ratio: 1
    });
    video.setVideo(node);

    expect(stub_getAttribute.getCall(0).args[0]).toEqual('data-base-url');
    expect(stub_getAttribute.getCall(1).args[0]).toEqual('data-video');

    expect(stub_setAttribute.callCount).toEqual(7);
    expect(stub_appendChild.callCount).toEqual(3);

    expect(stub_setAttribute.getCall(0).args[0]).toEqual('poster');
    expect(stub_setAttribute.getCall(0).args[1]).toEqual('http://base.test/w_1920,br_3m/test-name-wide.jpg');

    expect(stub_setAttribute.getCall(1).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(1).args[1]).toEqual('http://base.test/w_1920,br_3m/test-name-wide.webm');
    expect(stub_setAttribute.getCall(2).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(2).args[1]).toEqual('video/webm');

    expect(stub_setAttribute.getCall(3).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(3).args[1]).toEqual('http://base.test/w_1920,br_3m/test-name-wide.mp4');
    expect(stub_setAttribute.getCall(4).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(4).args[1]).toEqual('video/mp4');

    expect(stub_setAttribute.getCall(5).args[0]).toEqual('src');
    expect(stub_setAttribute.getCall(5).args[1]).toEqual('http://base.test/w_1920,br_3m/test-name-wide.ogv');
    expect(stub_setAttribute.getCall(6).args[0]).toEqual('type');
    expect(stub_setAttribute.getCall(6).args[1]).toEqual('video/ogg');

    expect(stub_play.callCount).toEqual(1);

    stub_getVideoParams.restore();
    stub_createElement.restore();
  });

});
