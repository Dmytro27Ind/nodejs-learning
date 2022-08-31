const handlers = require('../handlers')

// const mockCallback = jest.fn(x => 42 + x);
// forEach([0, 1], mockCallback);
//* The mock function is called twice
// expect(mockCallback.mock.calls.length).toBe(2);
//* The first argument of the first call to the function was 0
// expect(mockCallback.mock.calls[0][0]).toBe(0);
//* The first argument of the second call to the function was 1
// expect(mockCallback.mock.calls[1][0]).toBe(1);
//* The return value of the first call to the function was 42
// expect(mockCallback.mock.results[0].value).toBe(42);

test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('page about display with fortune', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({ fortune: expect.stringMatching(/\W/), })
    )
})

test('not fount page 404 rendering', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('server error page 500 rendering', () => {
    const err = new Error('some error')
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    handlers.serverError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})