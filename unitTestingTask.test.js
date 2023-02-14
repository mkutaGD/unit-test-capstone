const unitTestingTask = require("./unitTestingTask");

test('throws exception if `format` argument is not a string', () => {
    const f = () => { unitTestingTask(99, new Date()) }
    expect(f).toThrow('Argument `format` must be a string');
})

test('throws exception if `date` argument is not a date', () => {
    const f = () => { unitTestingTask('MM', true) }
    expect(f).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
})



test('register date format', () => {
    expect(unitTestingTask.register('ISODateTimeTZ', 'YYYY-MM-ddThh:mm:ssZ')(new Date('2023-2-13'))).toBe('2023-02-13T12:00:00+01:00')
})

test('unitTestingTask with format which already exists', () => {
    expect(unitTestingTask('ISODateTimeTZ', new Date('2023-2-13'))).toBe('2023-02-13T12:00:00+01:00')
})

test('unitTestingTask with format which not exist', () => {
    unitTestingTask.lang('pl', undefined);
    console.log(unitTestingTask._languages)
    console.log(unitTestingTask('DD-MM-YYYY', new Date()))
})

test('formats by default in English if language is not set', () => {
    unitTestingTask.lang()
    expect(unitTestingTask._languages.en._months[0]).toBe('January')
})

test('change language with no options', () => {
    unitTestingTask.lang('pl', undefined);
    expect(unitTestingTask._languages.current).toBe('pl')
})

test('change language with options', () => {
    const options = {
        months: ['styczeń', 'luty']
    }

    unitTestingTask.lang('pl', options);

    expect(unitTestingTask._languages.pl.months[0]).toBe('styczeń');
})

