describe('Airport', function() {

  var airport;
  var plane;
  beforeEach(function() {
    airport = new Airport();
    plane = new Plane();
  });

  it('has no planes by default', function() {
    expect(airport.planes()).toEqual([]);
  });

  it('can clear planes for takeoff', function() {
    airport.clearForLanding(plane);
    airport.clearForTakeoff(plane);
    expect(airport.planes()).toEqual([]);
  });

  it('can check for stormy conditions', function() {
    expect(airport.isStormy()).toBeFalsy();
  });

  describe('under stormy conditions', function() {

    it('does not clear planes for takeoff', function() {
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function() { airport.clearForTakeoff(plane); }).toThrowError('cannot takeoff during storm');
    });

    it('does not clear planes for landing', function() {
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function() { airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
    });

  });
});
