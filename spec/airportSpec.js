describe('Airport', function() {

  var airport;
  var plane;
  var weather;

  beforeEach(function() {
    weather = jasmine.createSpyObj('weather', ['isStormy']);
    airport = new Airport(weather);
    plane = jasmine.createSpy('plane');
  });

  it('has no planes by default', function() {
    expect(airport.planes()).toEqual([]);
  });

  describe('under clear conditions', function() {

    beforeEach(function() {
      weather.isStormy.and.returnValue(false);
    });

    it('can clear planes for takeoff', function() {
      airport.clearForLanding(plane);
      airport.clearForTakeoff(plane);
      expect(airport.planes()).toEqual([]);
    });

    it('can land a plane', function() {
        airport.clearForLanding(plane);
        expect(airport.planes()).toEqual([plane]);
    });
  });


  describe('under stormy conditions', function() {

    beforeEach(function() {
      weather.isStormy.and.returnValue(true);
    });

    it('does not clear planes for takeoff', function() {
      expect(function() { airport.clearForTakeoff(plane); }).toThrowError('cannot takeoff during storm');
    });

    it('does not clear planes for landing', function() {
      expect(function() { airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
    });

  });
});
