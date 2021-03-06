QUnit.module( "text-format: message-format" );

QUnit.test( "Format message", function( assert ) {
    var planet = 7;
    var event = "a disturbance in the Force";
    var date = new Date( 2053, 6, 3, 12, 30 );
    Locale.setDefault( new Locale( "en", "US" ) );
    assert.equal( MessageFormat.format( "At {1,time,short} on {1,date}, there was {2} on planet {0,number,integer}.", planet, date, event ),
        "At 12:30 PM on Jul 3, 2053, there was a disturbance in the Force on planet 7." );
} );

QUnit.test( "Message format 1", function( assert ) {
    var form = new MessageFormat( "The disk \"{1}\" contains {0}.", new Locale( "en", "US" ) );
    var fileLimits = [ 0, 1, 2 ];
    var fileParts = [ "no files", "one file", "{0,number} files" ];
    var fileForm = new ChoiceFormat( fileLimits, fileParts );
    var fileCounts = [ 0, 1, 2, 3, 1273 ];
    var results = [
        "The disk \"MyDisk\" contains no files.",
        "The disk \"MyDisk\" contains one file.",
        "The disk \"MyDisk\" contains 2 files.",
        "The disk \"MyDisk\" contains 3 files.",
        "The disk \"MyDisk\" contains 1,273 files."
    ];
    form.setFormatByArgumentIndex( 0, fileForm );
    fileCounts.forEach( function( fileCount, i ) {
        assert.equal( form.format( [ fileCount, "MyDisk" ] ), results[ i ] );
    } );
} );

QUnit.test( "Message format 2", function( assert ) {
    var form = new MessageFormat( "The disk \"{1}\" contains {0,choice,0#no files|1#one file|1<{0,number,integer} files}.", new Locale( "en", "US" ) );
    var fileCounts = [ 0, 1, 2, 3, 1273 ];
    var results = [
        "The disk \"MyDisk\" contains no files.",
        "The disk \"MyDisk\" contains one file.",
        "The disk \"MyDisk\" contains 2 files.",
        "The disk \"MyDisk\" contains 3 files.",
        "The disk \"MyDisk\" contains 1,273 files."
    ];
    fileCounts.forEach( function( fileCount, i ) {
        assert.equal( form.format( [ fileCount, "MyDisk" ] ), results[ i ] );
    } );
} );

QUnit.test( "Message format 3", function( assert ) {
    var fileLimits = [ 0, 1, 2 ];
    var fileParts = [ "are no files", "is one file", "are {2} files" ];
    var fileForm = new ChoiceFormat( fileLimits, fileParts );
    var formats = [ fileForm, null, NumberFormat.getInstance() ];
    var args = [ null, "ADisk", null ];
    var form = new MessageFormat( "There {0} on {1}" );
    var results = [
        "There are no files on ADisk",
        "There is one file on ADisk",
        "There are 2 files on ADisk",
        "There are 3 files on ADisk",
        "There are 4 files on ADisk"
    ];
    form.setFormats( formats );
    assert.equal( form.toPattern(), "There {0,choice,0#are no files|1#is one file|2#are {2} files} on {1}" );
    results.forEach( function( result, i ) {
        args[ 2 ] = args[ 0 ] = i;
        assert.equal( form.format( args ), result );
    } );
} );

QUnit.test( "Format date time pattern", function( assert ) {
    var locales = [ "en-GB", "en-US", "es-ES", "fr-FR", "it-IT" ];
    var results = [ "dd/MM/yy HH:mm", "M/d/yy h:mm a", "d/MM/yy H:mm", "dd/MM/yy HH:mm", "dd/MM/yy H.mm" ];
    locales.forEach( function( tag, i ) {
        var locale = Locale.forLanguageTag( tag );
        var df = DateFormat.getDateTimeInstance( DateFormat.SHORT, DateFormat.SHORT, locale );
        assert.equal( df.toPattern(), results[ i ] );
    } );
} );
