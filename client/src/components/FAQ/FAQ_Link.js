import React from "react";
import {Routes, Route} from 'react-router-dom';
import './FAQ_Link.css'

const FAQ_Link = () => {
    return (
        <div className='faq_banner_container'>
            <div id= "faq"> 
                <h1>FAQ</h1>
                <div>
                    <h2>How do I... </h2>
                        <div id='faq_links'>
                                <p>1. How do you read a two-line elset? </p>
                                <p>2. How does one convert two-line elements to some other format? </p>
                                <p>3. What is the accuracy of predictions using the two-line element sets?</p>
                                <p>4. How often are element sets generated?</p>
                                <p>5. What is the reference frame of the resulting coordinates?</p>
                                <p>6. Are there two-line element sets for the moon and/or sun?</p>
                                <p>7. How do new satellite elements get added to the CelesTrak WWW? Can I trust it?</p>
                                <p>8. How does one find source code for the SGP4/SDP4 orbital models?</p>
                                <p>9. Where does one find a list of satellite frequencies?</p>
                                <p>10.How does one obtain historical element sets?</p>

                                <p>1. How do you read a two-line elset</p>
                                <p>Two Line Format
                                    This is the format defined by the United States Space Force (USSF) 18th Space Defense Squadron to distribute satellite elements via the space-track.org web site.   AMSAT uses this format for distribution of TLEs.
                                    As presently used in most tracking software, each spacecraft gets three lines – one line containing the satellite’s name, followed by the standard two lines of elements. Tracking programs are usually unforgiving of anything that doesn’t fit this format.   Some USSF documentation refers to this as 3LE format.
                                    TLE files look like a series of three line sets as shown in below:

                                    ISS (ZARYA)
                                    1 25544U 98067A   04236.56031392  .00020137  00000-0  16538-3 0  9993
                                    2 25544  51.6335 344.7760 0007976 126.2523 325.9359 15.70406856328906
                                    ----------------------------------------------------------------------
                                    1234567890123456789012345678901234567890123456789012345678901234567890   reference number line
                                            1         2         3         4         5         6         7

                                    Each number is in a specified fixed column. Spaces are significant. The last digit on each line is a modulo 10 check digit giving recipients a means for rudimentary error checking.   The check digit was important when these data were distributed by noisy teletype lines, and is practically irrelevant when modern communication protocols are in use. 

                                    Line 0
                                    Line 0 contains the object name up to 24 characters
                                    There is no checksum on this line.

                                    Line 1

                                    Column     Description
                                    01-01     Line Number of Element Data
                                    03-07     Satellite Number
                                    08        Classification.   Almost always "U" for unclassified
                                    10-11     International Designator (Last two digits of launch year)
                                    12-14     International Designator (Launch number of the year)
                                    15-17     International Designator (Piece of launch)
                                    19-20     Epoch Year (Last two digits of year)
                                    21-32     Epoch (Day number and fractional portion of the day)
                                    34-43     1st Derivative of the Mean Motion with respect to Time *
                                    45-52     2nd Derivative of the Mean Motion with respect to Time (decimal point assumed) *
                                    54-61     BSTAR drag term 
                                    63-63     Ephemeris type
                                    65-68     Element set number (modern TLEs from USSF always use 999)
                                    69-69     Checksum (Modulo 10)

                                    The checksum is computed as follows:
                                    1. Start with zero.
                                    2. For each digit in the line, add the value of the digit.
                                    3. Blanks, periods, letters, ‘+’ signs add zero
                                    4. For’-‘ signs add 1
                                    5. Take the last decimal digit of the result (that is, take the result modulo 10) as the check digit.
                                    All other columns are blank or fixed.
                                    Note that the 1st and 2nd derivatives of mean motion are not used in amateur tracking software, however they may be useful to help predict re-entry of satellites in the weeks immediately before their demise.

                                    Line 2
                                    Column     Description
                                    01-01     Line Number of Element Data
                                    03-07     Satellite Catalog Number
                                    09-16     Inclination [Degrees]
                                    18-25     Right Ascension of the Ascending Node [Degrees]
                                    27-33     Eccentricity (decimal point assumed)
                                    35-42     Argument of Perigee [Degrees]
                                    44-51     Mean Anomaly [Degrees]
                                    53-63     Mean Motion [Revs per day]
                                    64-68     Revolution number at epoch [Revs] 
                                    69-69     Checksum (Modulo 10)

                                    The same checksum algorithm as described in line 1 is used here.
                                    All other columns are blank or fixed.

                                    Source: https://www.projectpluto.com/tle_info.htm
                                    Source: https://www.amsat.org/keplerian-elements-formats/
                                </p>
                                    <p> 2. How does one convert two-line elements to some other format? </p>
                                    <p>
                                    Actually, this is one of the most common questions I get asked. Usually, the user has data in some other format that they want to use in a program that uses two-line element sets or they have two-line element set data that they want to use in their favorite satellite-tracking program. The simple answer is: Just don't do it! Here's why.
                                    The common misconception is that the two-line element sets are simply a format for standard data. After all, if both the two-line element set format and Format X have an eccentricity term, it should be a simple matter of substituting the value. Other terms could simply be interchanged by using a straightforward mathematical transformation (such as the relationship between mean motion and semi-major axis). Isn't there a program to automatically handle this conversion? Unfortunately, it's not quite that simple.
                                    The elements in the two-line element sets are mean elements calculated to fit a set of observations using a specific model—the SGP4/SDP4 orbital model. Just as you shouldn't expect the arithmetic and geometric means of a set of data to have the same value, you shouldn't expect mean elements from different element sets—calculated using different orbital models—to have the same value. The short answer is that you cannot simply reformat the data unless you are willing to accept predictions with unpredictable errors. The long answer is that I will discuss a method for transforming element sets—which involves a much more complicated process—in a future column.
                                    </p>
                                    <p>3. What is the accuracy of predictions using the two-line element sets?</p> 
                                    <p>
                                    Accuracy of the two-line element sets is dependent upon a number of factors. These range from the particular sensors used and amount of data collected to the type of orbit and condition of the space environment. Unfortunately, since these factors vary for each element set, so does the accuracy. While NORAD has experimented with methods to incorporate prediction quality into the element sets, none of these methods has yet proved successful.
                                    It is possible, however, to assess the consistency of the element set data, rather than their accuracy. That is, how well one element set's predictions agree with those of its successor or predecessor element set. By comparing the magnitude of the vector difference of the predictions from two successive element sets at the epoch of the newer element set (when it should be most accurate), it is possible to gauge the consistency between those element sets. Taken in aggregate for a particular satellite over time, it is possible to gauge the general accuracy of the data (assuming that the element set production process is statistically unbiased) and get a sense for how long an element set is valid.
                                    While NORAD maintains specific target tolerances for the overall level of accuracy as a system performance metric, it can be expected that accuracy will vary depending upon the type of orbit and satellite involved. For this reason, it is probably best to independently assess the accuracy of each specific satellite for which accuracy is a consideration. For more information on this topic, see my column titled "Real-World Benchmarking" in Satellite Times Volume 3 Number 2.
                                    Accuracy of the two-line element sets is dependent upon a number of factors. These range from the particular sensors used and amount of data collected to the type of orbit and condition of the space environment. Unfortunately, since these factors vary for each element set, so does the accuracy. While NORAD has experimented with methods to incorporate prediction quality into the element sets, none of these methods has yet proved successful.
                                    </p>
                                    <p>4. How often are element sets generated?</p> 
                                    <p>
                                    New element sets are generated by NORAD on an as-needed basis rather than according to an established timetable. How often these updates occur depends upon a number of factors such as the orbit type or maneuvering capability of the satellite. For example, a satellite in low-earth orbit—such as the US space shuttle—would have its element sets updated several times a day because of the somewhat unpredictable results of atmospheric drag as it varies its attitude and the maneuvering being performed. A satellite in a low-drag orbit which doesn't maneuver—such as LAGEOS II—might only need updates once or twice a week. Objects such as rocket bodies, defunct payloads, or other space debris, won't be updated as frequently, either—unless there is a prediction of a close approach with an operational payload. Special-interest objects—such as a large object reentering the earth's atmosphere—normally get special treatment.
                                    </p>
                                    <p>5. What is the reference frame of the resulting coordinates?</p>
                                    <p>
                                    This question is a bit more technical than most we have covered. To be precise, the reference frame of the Earth-centered inertial (ECI) coordinates produced by the SGP4/SDP4 orbital model is true equator, mean equinox (TEME) of epoch.
                                    In layman's terms, this simply means that the cartesian coordinates produced by the SGP4/SDP4 model have their z axis aligned with the true (instantaneous) North pole and the x axis aligned with the mean direction of the vernal equinox (accounting for precession but not nutation). This actually makes sense since the observations are collected from a network of sensors fixed to the earth's surface (and referenced to the true equator) but the position of the earth in inertial space (relative to the vernal equinox) must be estimated. For more details on this coordinate system, see my article on "Orbital Coordinate Systems, Part I" in Satellite Times Volume 2 Number 1.
                                    </p>
                                    <p>6. Are there two-line element sets for the moon and/or sun?</p>
                                    <p>
                                    The short answer to this question is no. Assumptions made in the SGP4/SDP4 orbital model—made to reduce the computational burden of tracking thousands of earth satellites—are completely invalid when applied to other celestial bodies. Details on why this is so were covered in the January/February 1997 issue of this column titled—naturally enough—"Tracking the Sun and the Moon." If you want to track the sun, moon, planets, or the latest comet, you're going to need to use an orbital model specifically designed to track these objects.
                                    </p>
                                    <p>7. How do new satellite elements get added to the CelesTrak WWW? Can I trust it?</p>
                                    <p>
                                    Normally, all new objects are added to the master list as soon as the object is catalogued by NORAD. After 30 days have elapsed, elements are only maintained if someone requests that they be—otherwise, they are removed. At present, the master list contains a broad range of satellite element sets used by a large number of people around the world. It contains elements for various communications, navigation, weather, and other scientific satellites. Over the years, it has grown to include 300 satellite element sets.
                                    The master list was originally intended as a single source of distribution back when this was originally done via the Celestial BBS and (later) the Usenet newsgroups. However, many users are interested in only a particular category of satellites for their applications, such as amateur radio satellites, and don't want a large list. As such, the CelesTrak WWW breaks out the satellite element sets into separate categorical lists to make it easier to find the elements of interest to you. Check out the Current Data section to see what lists are currently available.
                                    In the future, the master list will probably be replaced with a list which contains only new objects catalogued within the past 30 days. All other elements will be contained within the individual categorical lists. Eventually, I hope to be able to provide users an option of defining their own list of elements to provide the ultimate in customization.
                                    </p>
                                    <p>8. How does one find source code for the SGP4/SDP4 orbital models?</p>
                                    <p>
                                    The primary source for the SGP4/SDP4 orbital models is found in Spacetrack Report Number 3: Models for Propagation of NORAD Element Sets. It contains the equations for most of the model along with the associated FORTRAN source code. This document is available on the CelesTrak WWW in Adobe Acrobat Portable Document Format (PDF). The FORTRAN source code can be copied directly from this document and pasted into any text editor. There is also a LATEX version online.
                                    If you need source code in some language other than FORTRAN, you can also find a Pascal version of the complete SGP4/SDP4 orbital model on the CelesTrak WWW in my SGP4 Pascal Library. It contains not only the NORAD orbital model, but routines for doing various coordinate transformations and calculating the position of the sun. These routines were used to develop my TrakStar program—a simple program intended to show how easy it is to use the library but often used as a standalone analysis tool. While I still plan to produce a C version of this code, I have not had time to do this yet and I know of no publicly-available C version which contains both the SGP4 and SDP4 orbital models.
                                    </p>
                                    <p>9. Where does one find a list of satellite frequencies?</p>
                                    <p>
                                    The best source of information on satellite downlink frequencies that I've seen can be found on Launchspace.com in their Reference section. It contains a list of over 600 downlink frequencies in the range of 3 MHz to 32 GHz covering everything from satellites to NASA support aircraft [Launchspace no longer carries this list of satellite frequencies. If I find another source, I'll include it here.].
                                    </p>
                                    <p>10.How does one obtain historical element sets?</p>
                                    <p>
                                    As of mid-January 1998, there is now an online form on the CelesTrak WWW to request historical two-line element sets. Current archives run from January 1980 through the present and contain over ten million two-line element sets. Those historical element sets which are requested frequently are kept online in the Historical Archives section. However, it is impossible to keep all of the current archives—over 1.5 gigabytes of data—online. If you have a need for historical data which cannot be found online, please use this form (found at the bottom of the main Historical Archives page) to request the data you need.
                                    </p>
                                    <p>
                                    Correction: In my last column ("Frequently Asked Questions: Two-Line Element Set Format" Satellite Times Volume 4 Number 3), I suggested that the format for fields 1.10 and 1.11 owed its heritage to the FORTRAN programming language. Instead, as one of our readers pointed out, it originated with the Philco 2000/Model 212 and the TAC assembly language used on the original 496L system. The FORTRAN language just happens to follow the same convention.
                                    Source: https://celestrak.org/columns/v04n05/#FAQ05
                                    </p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ_Link;